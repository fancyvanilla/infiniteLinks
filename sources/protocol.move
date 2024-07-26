module AppAddr::defi_protocol {
    use std::signer;
    use aptos_framework::coin;
    use std::event;
    use aptos_std::type_info::{Self, TypeInfo};
    use std::vector;

    // Constants
    const PRECISION: u64 = 1000000; // 6 decimal places for precision
    const MAX_VOUCHER_BONUS: u64 = 100000; // 0.1 or 10% max bonus from vouchers
    const MAX_SCORE_BONUS: u64 = 200000; // 0.2 or 20% max bonus from score
    const MAX_CONNECTIONS: u64 = 100; // Example value, adjust as needed
    const BASE_SOCIAL_BORROW_LIMIT: u64 = 1000000; // Example value, adjust as needed

    // Error codes
    const E_USER_ACCOUNT_NOT_EXIST: u64 = 1;
    const E_ONLY_ADMIN: u64 = 2;
    const E_ALREADY_VOUCHED: u64 = 3;
    const E_MAX_CONNECTIONS_REACHED: u64 = 4;
    const E_CONNECTION_ALREADY_EXISTS: u64 = 5;
    const E_BORROW_EXCEEDS_ALLOWED: u64 = 6;
    const E_INSUFFICIENT_COLLATERAL: u64 = 7;

    struct CoinInfo has store {
        coin_type: TypeInfo,
        amount: u64,
    }


    struct LiquidityStore has key{
        signer_cap: account::SignerCapability,
        total_balance: u64;
    }


//TODO:ressource account
    struct LendingPool has key {
        collateral_factors: vector<CoinInfo>,
        borrow_factors: vector<CoinInfo>,
        signer_cap: account::SignerCapability,
    }

    struct UserAccount has key {
        collateral: vector<CoinInfo>,
        borrows: vector<CoinInfo>,
        vouches_received: u64,
        score: u64,
        vouches_given: vector<address>,
        connections: vector<address>,
    }
 
    #[event]
    struct LiquidationEvent has drop, store {
        user_account: address,
        margin: u64,
    }


    public fun init_module(ressource_signer:&signer) acquires LendingPool{
          let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_signer, @source_addr);
    }

    public fun initialize_pool(admin: &signer) {
        let pool = LendingPool {
            collateral_factors: vector::empty(),
            borrow_factors: vector::empty(),
        };
        
        move_to(admin, pool);
    }

    public fun create_user_account(account: &signer) {
        move_to(account, UserAccount {
            collateral: vector::empty(),
            borrows: vector::empty(),
            vouches_received: 0,
            score: 0,
            vouches_given: vector::empty(),
            connections: vector::empty(),
        });
    }

    public fun deposit<CoinType>(account: &signer, amount: u64, admin: &signer) acquires UserAccount {
        let sender = signer::address_of(account);
        assert!(exists<UserAccount>(sender), E_USER_ACCOUNT_NOT_EXIST);
        let admin_addr = signer::address_of(admin)
        let user_account = borrow_global_mut<UserAccount>(sender);

        let coin_type = type_info::type_of<CoinType>();
        let mut_collateral = &mut user_account.collateral;
        let index = find_coin_index(mut_collateral, &coin_type);

        if (index == vector::length(mut_collateral)) {
            vector::push_back(mut_collateral, CoinInfo { coin_type, amount });
        } else {
            let coin_info = vector::borrow_mut(mut_collateral, index);
            coin_info.amount = coin_info.amount + amount;
        };

        coin::transfer<CoinType>(account, admin_addr, amount);
    }

    public fun borrow<BorrowCoin>(account: &signer, amount: u64, admin_addr: address) acquires LendingPool, UserAccount {
        let sender = signer::address_of(account);
        assert!(exists<UserAccount>(sender), E_USER_ACCOUNT_NOT_EXIST);

        let pool = borrow_global<LendingPool>(admin_addr);
        let user_account = borrow_global_mut<UserAccount>(sender);

        let (collateral_borrow, social_borrow) = calculate_max_borrow(pool, user_account);
        let max_borrow = collateral_borrow + social_borrow;
        assert!(amount <= max_borrow, E_BORROW_EXCEEDS_ALLOWED);

        let coin_type = type_info::type_of<BorrowCoin>();
        let mut_borrows = &mut user_account.borrows;
        let index = find_coin_index(mut_borrows, &coin_type);

        if (index == vector::length(mut_borrows)) {
            vector::push_back(mut_borrows, CoinInfo { coin_type, amount });
        } else {
            let coin_info = vector::borrow_mut(mut_borrows, index);
            coin_info.amount = coin_info.amount + amount;
        };

        coin::transfer<BorrowCoin>(account, sender, amount);
    }

    fun calculate_max_borrow(pool: &LendingPool, user_account: &UserAccount): (u64, u64) {
        let collateral_borrow = calculate_collateral_borrow(pool, user_account);
        let social_borrow = calculate_social_borrow(user_account);
        assert!(collateral_borrow + social_borrow > 0, E_INSUFFICIENT_COLLATERAL);
        (collateral_borrow, social_borrow)
    }

    fun calculate_collateral_borrow(pool: &LendingPool, user_account: &UserAccount): u64 {
        let total_collateral_value = 0;
        let total_borrow_value = 0;

        let i = 0;
        let len = vector::length(&user_account.collateral);
        while (i < len) {
            let coin_info = vector::borrow(&user_account.collateral, i);
            let collateral_factor = get_factor(&pool.collateral_factors, &coin_info.coin_type);
            total_collateral_value = total_collateral_value + (coin_info.amount * collateral_factor / PRECISION);
            i = i + 1;
        };

        let i = 0;
        let len = vector::length(&user_account.borrows);
        while (i < len) {
            let coin_info = vector::borrow(&user_account.borrows, i);
            let borrow_factor = get_factor(&pool.borrow_factors, &coin_info.coin_type);
            total_borrow_value = total_borrow_value + (coin_info.amount * PRECISION / borrow_factor);
            i = i + 1;
        };

        total_collateral_value - total_borrow_value
    }

    fun calculate_social_borrow(user_account: &UserAccount): u64 {
        let connection_factor = vector::length(&user_account.connections) * PRECISION / MAX_CONNECTIONS;
        let vouch_factor = user_account.vouches_received * 2 * PRECISION / 100; // 2% increase per vouch
        let score_factor = user_account.score * PRECISION / 100;

        BASE_SOCIAL_BORROW_LIMIT * (PRECISION + connection_factor + vouch_factor + score_factor) / PRECISION
    }

    public fun update_user_vouchers(admin: &signer, user: address, new_vouchers: u64, admin_addr: address) acquires UserAccount {
        assert!(signer::address_of(admin) == admin_addr, E_ONLY_ADMIN);
        let user_account = borrow_global_mut<UserAccount>(user);
        user_account.vouches_received = new_vouchers;
    }

    public fun update_user_score(admin: &signer, user: address, new_score: u64, admin_addr: address) acquires UserAccount {
        assert!(signer::address_of(admin) == admin_addr, E_ONLY_ADMIN);
        let user_account = borrow_global_mut<UserAccount>(user);
        user_account.score = new_score;
    }

    public fun vouch_for_user(account: &signer, vouched_user: address) acquires UserAccount {
        let sender = signer::address_of(account);
        let vouching_account = borrow_global_mut<UserAccount>(sender);
        assert!(!vector::contains(&vouching_account.vouches_given, &vouched_user), E_ALREADY_VOUCHED);
        vector::push_back(&mut vouching_account.vouches_given, vouched_user);

        let vouched_account = borrow_global_mut<UserAccount>(vouched_user);
        vouched_account.vouches_received = vouched_account.vouches_received + 1;
    }

    public fun add_connection(account: &signer, new_connection: address) acquires UserAccount {
        let sender = signer::address_of(account);
        let user_account = borrow_global_mut<UserAccount>(sender);
        assert!(vector::length(&user_account.connections) < MAX_CONNECTIONS, E_MAX_CONNECTIONS_REACHED);
        assert!(!vector::contains(&user_account.connections, &new_connection), E_CONNECTION_ALREADY_EXISTS);
        vector::push_back(&mut user_account.connections, new_connection);
    }

    public fun liquidation(account: &signer, admin_addr: address) acquires UserAccount, LendingPool {
        let sender = signer::address_of(account);
        assert!(exists<UserAccount>(sender), E_USER_ACCOUNT_NOT_EXIST);
        
        let pool = borrow_global<LendingPool>(admin_addr);
        let user_account = borrow_global_mut<UserAccount>(sender);
        
        let (collateral_borrow, social_borrow) = calculate_max_borrow(pool, user_account);
        let max_borrow = collateral_borrow + social_borrow;
        
        if (max_borrow < 0) {
            // Implement actual liquidation logic here
            // For example, sell collateral to cover the negative balance
            
            event::emit(LiquidationEvent {
                user_account: sender,
                margin: (max_borrow as u64),
            });
            
            // Reduce user's score as a penalty
            if (user_account.score >= 10) {
                user_account.score = user_account.score - 10;
            } else {
                user_account.score = 0;
            }
        }
    }

    public fun withdraw<CoinType>(account: &signer, amount: u64, admin_addr: address) acquires UserAccount, LendingPool {
        let sender = signer::address_of(account);
        assert!(exists<UserAccount>(sender), E_USER_ACCOUNT_NOT_EXIST);
        
        let pool = borrow_global<LendingPool>(admin_addr);
        let user_account = borrow_global_mut<UserAccount>(sender);
        
        let (collateral_borrow, _) = calculate_max_borrow(pool, user_account);
        assert!(collateral_borrow >= 0, E_INSUFFICIENT_COLLATERAL);
        
        // Calculate total collateral value
        let total_collateral_value = 0;
        let i = 0;
        let len = vector::length(&user_account.collateral);
        while (i < len) {
            let coin_info = vector::borrow(&user_account.collateral, i);
            let collateral_factor = get_factor(&pool.collateral_factors, &coin_info.coin_type);
            total_collateral_value = total_collateral_value + (coin_info.amount * collateral_factor / PRECISION);
            i = i + 1;
        };
        
        assert!(amount <= total_collateral_value, E_BORROW_EXCEEDS_ALLOWED);
        
        // Decrease the user's collateral balance
        let coin_type = type_info::type_of<CoinType>();
        let index = find_coin_index(&user_account.collateral, &coin_type);
        assert!(index < vector::length(&user_account.collateral), E_INSUFFICIENT_COLLATERAL);
        
        let coin_info = vector::borrow_mut(&mut user_account.collateral, index);
        assert!(coin_info.amount >= amount, E_INSUFFICIENT_COLLATERAL);
        coin_info.amount = coin_info.amount - amount;
        
        // Transfer the withdrawn amount to the user
        coin::transfer<CoinType>(account, sender, amount);
    }

    fun find_coin_index(coins: &vector<CoinInfo>, coin_type: &TypeInfo): u64 {
        let i = 0;
        let len = vector::length(coins);
        while (i < len) {
            if (&vector::borrow(coins, i).coin_type == coin_type) {
                return i
            };
            i = i + 1;
        };
        len
    }

    fun get_factor(factors: &vector<CoinInfo>, coin_type: &TypeInfo): u64 {
        let i = 0;
        let len = vector::length(factors);
        while (i < len) {
            let factor = vector::borrow(factors, i);
            if (&factor.coin_type == coin_type) {
                return factor.amount
            };
            i = i + 1;
        };
        0 // Default factor if not found
    }

    #[test_only]
    use aptos_framework::account::create_account_for_test;


    #[test(admin = @0xC0FFEE)]
    fun test_initialize_pool(admin: &signer) {
        initialize_pool(admin);
        assert!(exists<LendingPool>(signer::address_of(admin)), 0);
    }
  #[test(admin = @0xC0FFEE,user1=@0x123, user2=@0x144)]
    fun test_create_account(admin: &signer,user1: &signer,user2: &signer){
       
        // Create user accounts
        create_account_for_test(signer::address_of(user1));
        create_account_for_test(signer::address_of(user2));
        create_user_account(user1);
        create_account_for_test(user2)
        assert!(exists<UserAccount>(signer::address_of(user1)),0)
        assert!(exists<UserAccount>(signer::address_of(user2)),0)

    }
      #[test(admin = @0xC0FFEE,user1=@0x123, user2=@0x144, amount=100)]
   fun test_deposit_account(user1: &signer,amount:u64,admin:&signer){

    deposit(user1,admin,amount)

}
}
