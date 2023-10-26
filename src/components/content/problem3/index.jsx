import FormProblem3 from "./form";

export default function Problem3() {
  const answer = [
    {
      before: `interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}`,
      after: `interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}`,
      explain: "It makes the code shorter and easier to read.",
    },
    {
      before: `const getPriority = (blockchain: any): number => {
      switch (blockchain) {
        case "Osmosis":
          return 100;
        case "Ethereum":
          return 50;
        case "Arbitrum":
          return 30;
        case "Zilliqa":
          return 20;
        case "Neo":
          return 20;
        default:
          return -99;
      }
};`,
      after: `const getPriority = (blockchain: string): number => {
    const myObjectLookup = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    const defaultValue = -99;
    return myObjectLookup[blockchain] || defaultValue;
};`,
      explain: `When there are few cases we can consider using <i>object lookup</i>. It is shorter, easier to read
      and maintain. <i>switch case</i> is faster but we can only see the different when there are many more cases.
      I also changed type of <i>blockchain</i> from <i>any</i> to <i>string</i>.`,
    },
    {
      before: `const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
}, [balances, prices]);`,
      after: `const sortedBalances = useMemo(() => {
    const filtered = balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount <= 0) {
          return true;
        }
        return false;
    });

    const filteredAndSorted = filtered.sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
    });

    return filteredAndSorted;
}, [balances, prices]);`,
      explain: `First, instead of writing <b>balances.filter().sort()</b> at once, I separated it to 2 variables
      so the code doesn't look messy.<br/>
      Second, in the filter function, I changed <b>lhsPriority</b> to <b>balancePriority</b>.
      The nested if stalement look pretty bad with the unnecessary second "if",
      so I combined them into a single condition using the logical AND.<br/>
      And finally, in the sort function, Instead of using an <b>if-else</b> statement to compare the priorities,
      we can directly subtract <b>rightPriority</b> from <b>leftPriority</b>. This subtraction will result in a <b>negative</b>
      value if <b>leftPriority</b> is greater, a <b>positive</b> value if <b>rightPriority</b> is greater, and
      zero if they are equal.
      The return statement now simply returns the result of the subtraction.
      This ensures that the sorting function follows the desired sorting order.`,
    },
    {
      before: `const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
});`,
      after: `const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
});`,
      explain: `In the component <b>WalletRow</b> I see this prop <b>formattedAmount={balance.formatted}</b>. Since
      items of <b>sortedBalances</b> don't have <i>formatted</i> property but items of <b>formattedBalances</b> do,
      I changed it from <b>sortedBalances.map()</b> to <b>formattedBalances.map()</b>.`,
    },
  ];
  return (
    <div className='problem3'>
      {answer.map((item, index) => (
        <FormProblem3
          key={index}
          before={item.before}
          after={item.after}
          explain={item.explain}
          index={index}
        />
      ))}
      <p>Full code is in this repo:</p>
    </div>
  );
}
