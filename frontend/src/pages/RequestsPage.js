import React from "react";
import getRequestsApi from "../apis/getRequestsApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import RequestCard from "../components/RequestCard";

const RequestsPage = (props) => {
  //Login check already done
  const [requests, setRequests] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchRequests() {
      await getRequestsApi().then((response) => {
        // console.log({ requestResponse: response });
        setRequests(response.data.requests);
        setIsLoaded(true);
      });
    }
    fetchRequests();
  }, []);

  if (!isLoaded) {
    return (
      <div align="center">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Requests</h1>
      <h4 style={{ textAlign: "center" }}>
        Ingredient lists requested by our users waiting for a recipe to be
        created!
      </h4>
      <Grid container spacing={2}>
        {requests &&
          requests.map((request) => (
            <Grid key={request.request_id} item xs={4}>
              <RequestCard
                request_id={request.request_id}
                ingredients={request.ingredients}
                count={request.times_requested}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default RequestsPage;
