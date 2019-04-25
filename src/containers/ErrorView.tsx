import * as React from "react";

type Props = {
  loading: boolean;
  sys_id: string;
};

export function ErrorView({ loading, sys_id }: Props) {
  console.log("ErrorView function called...");
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div id="ErrorView">
      <h1>Error {sys_id}</h1>
    </div>
  );
}
