import { useButtonStyles } from "./styles";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ children, ...props }: Props) {
  const { styles } = useButtonStyles();
  return (
    <button
      {...props}
      className={styles.button}>
      {children}
    </button>
  );
}
