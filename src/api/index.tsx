import endpoint from '../configs/endpoint';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  console.log(jsonResult);
  if (!res.ok) {
    throw Error(jsonResult);
  }
  return jsonResult;
};

const getUserProfile = async (user: firebase.User | null | undefined) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/profile?idToken=${idToken}`);
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const userSignup = async (
  user: firebase.User | null | undefined,
  phone?: string,
  customName?: string,
  customEmail?: string,
  customPicture?: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    console.log(idToken);
    const response = await fetch(`${endpoint}/users/signup?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        phone,
        customName,
        customEmail,
        customPicture,
      }),
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const saveListing = async (user: firebase.User | null | undefined, listingId: string) => {
  try {
    const idToken = await user?.getIdToken();
    console.log(idToken);
    const response = await fetch(`${endpoint}/users/save-listing?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        listingId,
        creationTime: Date.now(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const viewListing = async (
  user: firebase.User | null | undefined,
  ids: [string],
  creationTimes: [number],
) => {
  try {
    const idToken = await user?.getIdToken();
    console.log(idToken);
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids}&creationTimes=${creationTimes}`,
      {
        method: 'GET',
      },
    );
    const result = await handleFetchNotOk(response);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { handleFetchNotOk, getUserProfile, userSignup, saveListing, viewListing };
