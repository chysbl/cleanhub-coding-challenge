import { Hub } from "../../types";
import styles from "./HubList.module.scss";

interface HubListProps {
  hubs: Hub[];
}
export default function HubList({ hubs }: HubListProps) {
  return (
    <ul>
      {hubs.map((hub) => (
        <HubListItem hub={hub} />
      ))}
    </ul>
  );
}

function HubListItem({ hub }: { hub: Hub }) {
  return <li className={styles.card}>{hub.uuid}</li>;
}
