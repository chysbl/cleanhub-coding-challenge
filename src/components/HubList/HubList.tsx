import { ReactComponent as Bottle } from "../../assets/icons/bottles.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { Hub } from "../../types";
import styles from "./HubList.module.scss";
import Pill from "../Pill/Pill";

interface HubListProps {
  hubs: Hub[];
}
export default function HubList({ hubs }: HubListProps) {
  if (!hubs.length) {
    return <p>no hubs available</p>;
  }

  return (
    <ul className={styles.hubList}>
      {hubs.map((hub) => (
        <HubListItem key={hub.uuid} hub={hub} />
      ))}
    </ul>
  );
}

function HubListItem({ hub }: { hub: Hub }) {
  return (
    <li className={styles.card}>
      <div className={styles.container}>
        {hub.logo && (
          <img src={hub.logo.directLink} alt="" className={styles.logo} />
        )}
        <div className={styles.content}>
          {hub.parentHubName && <Pill text={hub.parentHubName} />}
          <a
            href={`https://test.cleanhub.com/hub/${hub.slug}`}
            className={styles.link}
          >
            <h1 className={styles.title}>{hub.displayName}</h1>
            <div className={styles.arrowIcon}>
              <Arrow />
            </div>
          </a>
          <span>
            {hub.type} | {hub.location}
          </span>
          <Bottle />
        </div>
      </div>
    </li>
  );
}
