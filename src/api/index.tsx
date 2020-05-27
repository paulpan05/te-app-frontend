import endpoint from '../configs/endpoint';

const handleFetchNotOk = (res: Response) => {
  if (!res.ok) {
    throw Error(res.status + res.statusText);
  }
  return res.json();
};

const getUserProfile = async (user: firebase.User | null | undefined) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/profile`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export { handleFetchNotOk, getUserProfile };
