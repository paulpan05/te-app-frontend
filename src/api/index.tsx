import endpoint from '../configs/endpoint';
import { v4 as uuidv4 } from 'uuid';

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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        customName,
        customEmail,
        customPicture,
      }),
    });

    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const createListing = async (
  user: firebase.User | null | undefined,
  title: string,
  price: number,
  description: string,
  location: string,
  tags: string[],
  pictures: string[],
) => {
  /* TODO need to upload pictures to s3! */
  /* TODO incorporate the uuid thing */
  const listingId = uuidv4();
  console.log(`listingId: ${listingId}`);
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/make-listing?idToken=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId,
        creationTime: Date.now(),
        title,
        price,
        description,
        location,
        tags,
        pictures /* TODO upload to s3 also */,
      }),
    });

    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const updateListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
  title?: string,
  price?: number,
  description?: string,
  location?: string,
  pictures?: string[],
  tags?: string[],
  comment?: string[], // [commentId: string, userId: string, content: string]
  deleteTag?: boolean,
  deletePicture?: boolean,
  deleteComment?: boolean,
) => {
  /* TODO need to upload pictures to s3! */
  /* TODO incorporate the uuid thing */
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings/update?idToken=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId,
        creationTime,
        /* title, */
        price,
        /* description, */
        location,
        pictures /* TODO upload to s3 also */,
        tags,
        comment,
        deleteTag,
        deletePicture,
        deleteComment,
      }),
    });

    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const updateProfile = async (
  user: firebase.User | null | undefined,
  phone?: string,
  picture?: string,
  name?: string,
) => {
  /* TODO need to upload pictures to s3! */
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/update?idToken=${idToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        picture,
        name,
      }),
    });

    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

export {
  handleFetchNotOk,
  getUserProfile,
  updateProfile,
  createListing,
  updateListing,
  userSignup,
};
