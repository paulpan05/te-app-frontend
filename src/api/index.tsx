import endpoint from '../configs/endpoint';
import { v4 as uuidv4 } from 'uuid';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  //console.log(jsonResult);
  if (!res.ok) {
    throw Error(jsonResult);
  }
  return jsonResult;
};

const fetchListing = async (
  user: firebase.User | null | undefined,
  ids: string[],
  creationTimes: number[],
  setter?: Function,
) => {
  try {
    const idToken = await user?.getIdToken();
    // console.log(idToken);
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids.join(',')}&creationTimes=${creationTimes.join(',')}`,
    );
    const result = await handleFetchNotOk(response);
    if(setter){
      setter(result);
    }
    // console.log(result);
    return result;
  } catch (err) {
    // console.log(err);
    return undefined;
  }
};

const getListings = async (user: firebase.User | null | undefined) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings?idToken=${idToken}`);
    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const saveListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
) => {
  try {
    const idToken = await user?.getIdToken();
    console.log(idToken);
    const response = await fetch(`${endpoint}/users/save-listing?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        listingId,
        creationTime,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    return true;
  } catch (err) {
    return false;
  }
};
const unsaveListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/unsave-listing?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        listingId,
        creationTime,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    return true;
  } catch (err) {
    return false;
  }
};
const getUserProfile = async (user: firebase.User | null | undefined, targetUserId?:string) => {
  try {
    const idToken = await user?.getIdToken();
    let response;
    if(targetUserId!==undefined){
      response = await fetch(`${endpoint}/users/profile?idToken=${idToken}&targetUserId=${targetUserId}`);
    }
    else{
      response = await fetch(`${endpoint}/users/profile?idToken=${idToken}`);
    }
    const result = await handleFetchNotOk(response);
    //console.log(result);
    return result
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
  title: string,
  price: number,
  description: string,
  location: string,
  tags: string[],
  pictures: string[],
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

const updateProfile = async (
  user: firebase.User | null | undefined,
  phone: string,
  picture: string,
  name: string,
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

export { saveListing, unsaveListing, fetchListing, getListings, handleFetchNotOk, getUserProfile, updateProfile, createListing, updateListing, userSignup };
