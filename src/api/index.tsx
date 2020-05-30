import { v4 as uuidv4 } from 'uuid';
import endpoint from '../configs/endpoint';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  console.log(jsonResult);
  if (!res.ok) {
    throw Error(jsonResult);
  }
  return jsonResult;
};

const getUserProfile = async (user: firebase.User | null | undefined, targetUserId?: string) => {
  try {
    const idToken = await user?.getIdToken();
    let response;
    if (targetUserId !== undefined) {
      response = await fetch(
        `${endpoint}/users/profile?idToken=${idToken}&targetUserId=${targetUserId}`,
      );
    } else {
      response = await fetch(`${endpoint}/users/profile?idToken=${idToken}`);
    }
    const result = await handleFetchNotOk(response);
    console.log(result);
    return result;
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
    return true;
  } catch (err) {
    console.log(err);
    return false;
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
    return true;
  } catch (err) {
    console.log(err);
    return false;
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
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getReports = async (user: firebase.User | null | undefined) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/reports?idToken=${idToken}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    return result;
  } catch (err) {
    console.log(err);
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

const updateComments = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
  comments: { commentId: string; userId: string; content: string }[],
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings/update?idToken=${idToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId,
        creationTime,
        comments,
      }),
    });
    console.log('comment:' + JSON.stringify(comments));
    const result = await handleFetchNotOk(response);
    return true;
  } catch (err) {
    console.log(err);
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

const compareUserId = async (
  user: firebase.User | null | undefined,
  setter: Function,
  targetId: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    if (idToken === targetId) setter(true);
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
    console.log(idToken);
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

const fetchListing = async (
  user: firebase.User | null | undefined,
  setter: Function,
  ids: string[],
  creationTimes: number[],
) => {
  try {
    const idToken = await user?.getIdToken();
    // console.log(idToken);
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids}&creationTimes=${creationTimes}`,
    );
    const result = await handleFetchNotOk(response);
    setter(result);
    // console.log(result);
    return true;
  } catch (err) {
    // console.log(err);
    return false;
  }
};
/* const getSellerInfo = async (user: string, setter: Function) => {
  try {
    // const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/profile?idToken=${user}`);
    const result = await handleFetchNotOk(response);
    setter(result);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}; */
const deleteListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
) => {
  try {
    const idToken = await user?.getIdToken();
    // console.log(idToken);
    const response = await fetch(`${endpoint}/listings/update?idToken=${idToken}`, {
      method: 'PUT',
      body: JSON.stringify({
        listingId,
        creationTime,
        deleteTag: true,
      }),
    });
    const result = await handleFetchNotOk(response);
    // console.log(result);
    return true;
  } catch (err) {
    // console.log(err);
    return false;
  }
};

export {
  handleFetchNotOk,
  getUserProfile,
  userSignup,
  reportUser,
  reportListing,
  reportComment,
  getReports,
  updateProfile,
  createListing,
  updateListing,
  updateComments,
  saveListing,
  unsaveListing,
  fetchListing,
  compareUserId,
  // getSellerInfo,
  deleteListing,
};
