import { Hub } from "../../types";

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
  return <li>{hub.uuid}</li>;
}
