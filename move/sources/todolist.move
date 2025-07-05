module MyCoin::EscrowContract {
    use 0x1::Signer;
    use 0x1::Coin;
    use 0x1::Vector;
    struct ContractBalance has key, store {
        balance: u64,
    }
    public fun initialize(sender: &signer) {
        let contract_balance = ContractBalance { balance: 0 };
        move_to(sender, contract_balance);
    }
    public fun deposit(sender: &signer, amount: u64) {
        let coin = Coin::withdraw_from_account(sender, amount);
        let contract_balance = borrow_global_mut<ContractBalance>(Signer::address_of(sender));
        contract_balance.balance = contract_balance.balance + amount;
    }
    public fun withdraw(sender: &signer, recipient: address, amount: u64) {
        let contract_balance = borrow_global_mut<ContractBalance>(Signer::address_of(sender));
        assert!(contract_balance.balance >= amount, 100);
        contract_balance.balance = contract_balance.balance - amount;
        let coin = Coin::mint(amount);
        Coin::deposit(recipient, coin);
    }
    public fun get_balance(sender: &signer): u64 {
        let contract_balance = borrow_global<ContractBalance>(Signer::address_of(sender));
        contract_balance.balance
    }
    public fun destroy_contract(sender: &signer) {
        let contract_balance = move_from<ContractBalance>(Signer::address_of(sender));
        destroy contract_balance;
    }
}