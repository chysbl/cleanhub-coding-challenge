import { Hub } from '../../types';
import HubListItem from './HubListItem';
interface HubListProps {
  hubs: Hub[];
}
export default function HubList({ hubs }: HubListProps) {
  if (!hubs.length) {
    return <p>No hubs available</p>;
  }

  return (
    <ul>
      {hubs.map(hub => (
        <HubListItem key={hub.uuid} hub={hub} />
      ))}
    </ul>
  );
}
