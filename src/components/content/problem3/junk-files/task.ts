import { useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
}

// Should use extends type instead
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Use object lookup to read better
  const getPriority = (blockchain: any): number => {
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
  };

  const sortedBalances = useMemo(() => {
    // Write too much in just one continuos functions after functions. Define more variable instead.
    return balances
      .filter((balance: WalletBalance) => {
        // This one isn't used any where
        const balancePriority = getPriority(balance.blockchain);

        // What is lhsPriority
        // Nested too many if loop
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

        // This if else is bad too
        // Instead of using an if-else statement to compare priorities and return -1 or 1,
        // we can subtract leftPriority from rightPriority directly. This will give us a negative value
        // if rightPriority is greater, a positive value if leftPriority is greater, and 0 if they are equal.
        // By using the subtraction directly, the code becomes more concise and easier to read.
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // Should map from formattedBalances instead
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
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
  });

  return <div {...rest}>{rows}</div>;
};
