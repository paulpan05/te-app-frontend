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

/* UPDATE IN OTHER PLACES */
const getUserProfile = async (
  user: firebase.User | null | undefined,
  targetUserId?: string,
  setter?: Function,
) => {
  //TODO setter: Function, updating the calls
  try {
    const idToken = await user?.getIdToken();
    let response;
    if (targetUserId) {
      response = await fetch(
        `${endpoint}/users/profile?idToken=${idToken}&targetUserId=${targetUserId}`,
      );
    } else {
      response = await fetch(`${endpoint}/users/profile?idToken=${idToken}`);
    }
    const result = await handleFetchNotOk(response);
    console.log(result);
    if (setter) {
      setter(result);
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

const getListings = async (user: firebase.User | null | undefined, setter: Function) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings?idToken=${idToken}`);
    const result = await handleFetchNotOk(response);
    setter(result);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const fetchIdListings = async (
  user: firebase.User | null | undefined,
  setter: Function,
  ids: string[],
  creationTimes: number[],
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids}&creationTimes=${creationTimes}`,
    );
    const result = await handleFetchNotOk(response);
    setter(result);
    return true;
  } catch (err) {
    return false;
  }
};

const getListingsBySearch = async (
  user: firebase.User | null | undefined,
  searchTerm: string,
  setter: Function,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(
      `${endpoint}/listings/search?idToken=${idToken}&searchTerm=${searchTerm}`,
    );
    const result = await handleFetchNotOk(response);
    console.log(`searchTitle=${searchTerm} result=`);
    console.log(result);
    setter(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getListingsByTags = async (user: firebase.User | null | undefined, tags: string[]) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings/byTags?idToken=${idToken}&tags=${tags}`);
    const result = await handleFetchNotOk(response);
    console.log(result);
    return true;
  } catch (err) {
    console.log(err);
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
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/make-listing?idToken=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId: '12091209',
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

const userSignup = async (
  user: firebase.User | null | undefined,
  phone?: string,
  customName?: string,
  customEmail?: string,
  customPicture?: string,
) => {
  try {
    const idToken = await user?.getIdToken();
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
    return true;
  } catch (err) {
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
    return true;
  } catch (err) {
    return false;
  }
};

const updateComments = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
  comment: { commentId: string; userId: string; content: string },
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
        comment,
      }),
    });
    console.log('comment:' + JSON.stringify(comment));
    const result = await handleFetchNotOk(response);
    return true;
  } catch (err) {
    console.log(err);
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

const saveListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
) => {
  try {
    const idToken = await user?.getIdToken();
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

const fetchListing = async (
  user: firebase.User | null | undefined,
  setter: Function,
  ids: string[],
  creationTimes: number[],
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids}&creationTimes=${creationTimes}`,
    );
    const result = await handleFetchNotOk(response);
    // setter(result);
    return result;
  } catch (err) {
    return undefined;
  }
};

const getSellerInfo = async (
  user: firebase.User | null | undefined,
  targetUser: string,
  setter: Function,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(
      `${endpoint}/users/profile?idToken=${idToken}&targetUserId=${targetUser}`,
    );
    const result = await handleFetchNotOk(response);
    setter(result);
    return result;
  } catch (err) {}
};

const deleteListing = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
  tags: string[],
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/delete-listing?idToken=${idToken}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId,
        creationTime,
        tags,
      }),
    });
    const result = await handleFetchNotOk(response);
    return true;
  } catch (err) {
    return false;
  }
};

const markAsSold = async (
  user: firebase.User | null | undefined,
  listingId: string,
  listingCreationTime: string,
  sellerId: string,
  buyerId: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings/sell?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        sellerId,
        buyerId,
        listingId,
        listingCreationTime,
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
  getSellerInfo,
  deleteListing,
  getListings,
  getListingsBySearch,
  getListingsByTags,
  fetchIdListings,
  markAsSold,
};
