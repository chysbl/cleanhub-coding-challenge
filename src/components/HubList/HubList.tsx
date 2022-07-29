import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { Hub } from "../../types";
import styles from "./HubList.module.scss";
import Pill from "../Pill/Pill";
import { Grid, Typography } from "@mui/material";
interface HubListProps {
  hubs: Hub[];
}
export default function HubList({ hubs }: HubListProps) {
  if (!hubs.length) {
    return <p>No hubs available</p>;
  }

  return (
    <ul>
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
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Typography component="h1" variant="h4" className={styles.title}>
            {displayName}
          </Typography>
          <div className={styles.arrowIcon}>
            <Arrow />
          </div>
        </Grid>
      </a>
    );
  }

  return (
    <Typography className={styles.title} component="h1" variant="h4">
      {displayName}
    </Typography>
  );
}

function HubListItem({ hub }: { hub: Hub }) {
  const metaInfo = [hub.type, hub.location].filter(Boolean).join(" | ");

  return (
    <li className={styles.card}>
      <Grid container gap={2} alignItems="center">
        <Grid item xs={12} sm={12} md={2}>
          {hub.logo && (
            <img src={hub.logo.directLink} alt="" className={styles.logo} />
          )}
        </Grid>
        <Grid item xs>
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
        </Grid>
      </Grid>
    </li>
  );
}
