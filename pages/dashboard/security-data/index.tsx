import SequrityData from "@/components/SequrityData";

const SequrityDataPage = () => {
  return (
    
     <> <SequrityData /></>
      
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const cookies = req.cookies; // Access cookies from the request
  
  // Access a specific cookie, e.g., "token"
  const token = cookies.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/security-data?page=1`, {
      headers: {
          Authorization: `Bearer ${token}` // Use the token for authorization
      }
  });
  console.log(res)
  if (!res.ok) {
      console.error("Failed to fetch security data:", res.status, res.statusText);
      return {
          notFound: true,
      };
  }

  let data;
  try {
      data = await res.json();
  } catch (error) {
      console.error("Failed to parse JSON:", error);
      return {
          notFound: true,
      };
  }

  return {
      props: {
          initialData: data.data,
          totalPages: data.meta.last_page,
          initialPage: 1
      }
  };
};

export default SequrityDataPage;
