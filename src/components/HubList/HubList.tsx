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

function HubListTitle({
  displayName,
  slug,
}: Pick<Hub, "displayName" | "slug">) {
  if (slug) {
    return (
      <a href={`https://test.cleanhub.com/hub/${slug}`} className={styles.link}>
        <h1 className={styles.title}>{displayName}</h1>
        <div className={styles.arrowIcon}>
          <Arrow />
        </div>
      </a>
    );
  }

  return <h1 className={styles.title}>{displayName}</h1>;
}

function HubListItem({ hub }: { hub: Hub }) {
  const metaInfo = [hub.type, hub.location].filter(Boolean).join(" | ");

  return (
    <li className={styles.card}>
      <div className={styles.container}>
        {hub.logo && (
          <img src={hub.logo.directLink} alt="" className={styles.logo} />
        )}
        <div className={styles.content}>
          {hub.parentHubName && <Pill text={hub.parentHubName} />}
          <HubListTitle displayName={hub.displayName} slug={hub.slug} />
          <span>{metaInfo}</span>

          <dl className={styles.stats}>
            <div>
              <dd>
                {hub.formattedTotalRecoveredQuantity}
                {hub.referenceQuantityUnit}
              </dd>
              <dt>Plastic recovered</dt>
            </div>
            <div>
              <dd>
                {Math.round(hub.unassignedQuantityTotal)}
                {hub.referenceQuantityUnit}
              </dd>
              <dt>Unassigned plastic</dt>
            </div>
          </dl>
        </div>
      </div>
    </li>
  );
}
