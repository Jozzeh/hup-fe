export async function fetchApi(url, method = "GET", body = undefined) {
  let options = { cache: "no-cache" };
  options = { ...options, ...{ method: method } };
  if (window.localStorage.getItem("HupUserToken")) {
    options = {
      ...options,
      ...{
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.localStorage.getItem("HupUserToken"),
        },
      },
    };
  } else {
    options = {
      ...options,
      ...{ headers: { "Content-Type": "application/json" } },
    };
  }
  if (body) {
    options = { ...options, ...{ body: JSON.stringify(body) } };
  }

  const response = await fetch(process.env.REACT_APP_API_URL + url, options);
  if (response.status === 401) {
    //unauthorized
    window.localStorage.removeItem("HupUserToken");
    window.location.replace("/login");
  } else if (response.status >= 400) {
    console.log("-------------------------");
    console.log(response.status);
    console.log(response.statusText);
    console.log("-------------------------");
    const data = await response.json();
    if(data.errors) {
      return data;
    } else {
      return {errors: [data]}
    }
  } else {
    const data = await response.json();
    return data;
  }
}
