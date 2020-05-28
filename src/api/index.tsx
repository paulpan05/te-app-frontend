import endpoint from '../configs/endpoint';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  console.log(jsonResult)
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

const reportUser = async (
  user: firebase.User | null | undefined,
  type: string,
  reportId: string,
  description: string,
  reportedUserId: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/reports/add?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        type,
        reportId,
        description,
        userId: idToken,
        reportedUserId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const reportListing = async (
  user: firebase.User | null | undefined,
  type: string,
  reportId: string,
  description: string,
  listingId: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/reports/add?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        type,
        reportId,
        description,
        userId: idToken,
        listingId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const reportComment = async (
  user: firebase.User | null | undefined,
  type: string,
  reportId: string,
  description: string,
  listingId: string,
  commentId: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/reports/add?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        type,
        reportId,
        description,
        userId: idToken,
        listingId,
        commentId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export { handleFetchNotOk, getUserProfile, userSignup, reportUser, reportListing, reportComment };
