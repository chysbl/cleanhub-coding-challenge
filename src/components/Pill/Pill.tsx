import styles from "./Pill.module.scss";

interface PillProps {
  text: string;
}

export default function Pill({ text }: PillProps) {
  return <span className={styles.pill}>{text}</span>;
}
