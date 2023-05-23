import { useShowMeQuery } from "../redux/services/auth";

export default function Profile() {
  const { data, isLoading, error } = useShowMeQuery({});

  if (isLoading) return <div>Loading...</div>;

  console.log(data, error);
  return <div>Profile</div>;
}
