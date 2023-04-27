import { getXataClient, Posts } from "../xata";
// We'll assign the client to xata to make it easier to call
const xata = getXataClient();

// We will make the query to Xata on the server.
// This will allow the query to read the API_KEY from the .env file
export const getServerSideProps = async () => {
  const records: Posts[] = await xata.db.Posts.getMany();
  return {
    props: {
      records: records.map((record) => ({
        ...record,
        // We need to convert our date from an object to a string to use it here
        // If you didn't set up your pubDate column as "not null" Typescript may complain, so we'll add ? after pubDate for this example
        pubDate: record.pubDate?.toDateString(),
      })),
    },
  };
};

// Pass the props defined above to the page and map against it
export default function PostsListPage({ records }: { records: Posts[] }) {
  return (
    <>
      <h1>My xata posts</h1>
      {records.map((record: Posts) => (
        <div key={record.id}>
          <h2>{record.Title}</h2>
          <p>{record.id}</p>
          <p>{record.body}</p>
          {/* // 
          @ts-expect-error */}
          <p>{record?.pubDate}</p>
          <p>{record?.reviews ? "has reviews" : "does not have reviews"}</p>
        </div>
      ))}
    </>
  );
}
