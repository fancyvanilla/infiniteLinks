import { Account, Aptos, AccountAddress, AptosConfig, Network } from "@aptos-labs/ts-sdk"

// Initializing some stuff
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;

// Setting up the client
const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);

export async function createAccount(pk) {
  const account = Account.generate(pk);
  await fundAccount(account, 1)
  return account.accountAddress.toString()
}

async function fundAccount(account, amount) {
  await aptos.fundAccount({
    accountAddress: account.accountAddress,
    amount: amount,
  })
}

export async function getAccountBalance(account) {
  const accountBalance = await aptos.getAccountResource({
    accountAddress: account.accountAddress,
    resourceType: COIN_STORE
  })
  const balance = Number(accountBalance.coin.value)
  return balance
}

async function transferTokens(sender, receiver, amount) {
  const transaction = await aptos.transaction.build.simple({
    sender: sender.accountAddress,
    data: {
      function: "addrr::module-addr::transfer",
      functionArguments: [receiver.accountAddress, amount],
    }
  })
  const pendingTransaction = await aptos.signAndSubmitTransaction({
    signer: sender,
    transaction,
  });
  const executedTransaction = await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });
  console.log("Transaction hash:", executedTransaction.hash);
}