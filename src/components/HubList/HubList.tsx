import { ReactComponent as Bottle } from "../../assets/icons/bottles.svg";
import { Hub } from "../../types";
import styles from "./HubList.module.scss";

interface HubListProps {
  hubs: Hub[];
}
export default function HubList({ hubs }: HubListProps) {
  return (
    <ul>
      {hubs.map((hub) => (
        <HubListItem key={hub.uuid} hub={hub} />
      ))}
    </ul>
  );
}

function HubListItem({ hub }: { hub: Hub }) {
  return (
    <li className={styles.card}>
      <span>{hub.parentHubName}</span>
      <div className={styles.container}>
        {hub.logo && (
          <img src={hub.logo.directLink} alt="" className={styles.logo} />
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>{hub.displayName}</h1>
          <span>
            {hub.type} | {hub.location}
          </span>
          <Bottle />
        </div>
      </div>
    </li>
  );
}
