import { v4 as uuidv4 } from 'uuid';
import endpoint from '../configs/endpoint';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  console.log("HELLOOO");
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
    // console.log(result);
    if (setter) {
      setter(result);
    }
    return result;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

/* test with multiple */
const fetchListings = async (
  user: firebase.User | null | undefined,
  ids: string[],
  creationTimes: number[],
  setter?: Function,
) => {
  try {
    const idToken = await user?.getIdToken();
    // console.log(idToken);
    const response = await fetch(
      `${endpoint}/listings/byIds?idToken=${idToken}&ids=${ids.join(
        ',',
      )}&creationTimes=${creationTimes.join(',')}`,
    );
    const result = await handleFetchNotOk(response);
    if (setter) {
      setter(result);
    }
    // console.log(result);
    return result;
  } catch (err) {
    // console.log(err);
    return undefined;
  }
};

const getListings = async (user: firebase.User | null | undefined, setter: Function) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/listings?idToken=${idToken}`);
    const result = await handleFetchNotOk(response);
    
    setter(result);
    //console.log(result);
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
    return result;
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
    // console.log(result);
    setter(result);
    return true;
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
    // console.log(result);
    return result;
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
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/make-listing?idToken=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId: uuidv4(),
        creationTime: Date.now(),
        title,
        price,
        description,
        location,
        tags,
        pictures,
      }),
    });
    const result = await handleFetchNotOk(response);
    // console.log(result);
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

const uploadPictures = async (
  user: firebase.User | null | undefined,
  pictures: File[],
) => {
  try {
    const pictureURLs = await Promise.all(
      pictures.map(async picture => uploadPicture(user, picture, true))
    );

    // success: return the urls
    console.log(`pictureURLs for uploadPictures: ${pictureURLs}`);
    return pictureURLs;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const uploadPicture = async (
  user: firebase.User | null | undefined,
  picture: File,
  throwError?: boolean,
) => {
  try {
    // get necessary variables for api call
    const userId = user?.uid;
    const splitPath = picture.name.split('.');
    const fileExtension = splitPath[splitPath.length - 1];
    const key = `${userId}/${uuidv4()}.${fileExtension}`;

    const formData = new FormData();
    formData.append('key', key);
    formData.append('file', picture);

    const response = await fetch('https://triton-exchange-bucket-photos.s3.amazonaws.com', {
      method: 'POST',
      body: formData,
    });

    if (response.status !== 204) {
      throw Error(await response.json());
    }

    // success: return the link to access the image
    console.log("Success! Uploaded file.");
    return `https://triton-exchange-bucket-photos.s3.amazonaws.com/${key}`;
  } catch (err) {

    console.log(err);
    if (throwError) {
      throw err;
    } else {
      return undefined;
    }
  }
};

const deletePictures = async (pictureURLs: string[]) => {
  try {
    const responses = await Promise.all(
      pictureURLs.map(async pictureURL => deletePicture(pictureURL, true))
    );

    console.log("Success in deleting all images!");
    return responses;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

const deletePicture = async (
  picture: string,
  throwError?: boolean,
) => {
  try {
    const response = await fetch(picture, {
      method: 'DELETE',
    });

    if (response.status !== 204) {
      throw Error(await response.json());
    }

    return response;
  } catch (err) {
    
    console.log(err);
    if (throwError) {
      throw err;
    } else {
      return undefined;
    }
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
  comments?: string[][], // [commentId: string, userId: string, content: string]
  deleteTag?: boolean,
  deletePicture?: boolean,
  deleteComment?: boolean,
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
        title,
        description,
        price,
        location,
        pictures,
        tags,
        comments,
        deleteTag,
        deletePicture,
        deleteComment,
      }),
    });

    const result = await handleFetchNotOk(response);
    return result;
  } catch (err) {
    return undefined;
  }
};

const updateComments = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
  comments: string[][],
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
  phone?: string,
  picture?: string,
  name?: string,
) => {
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
    return result;
  } catch (err) {
    console.log(err.message);
    return undefined;
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
      method: 'DELETE',
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
    setter(result);
    return result;
  } catch (err) {
    return undefined;
  }
};

const searchUser = async (
  user: firebase.User | null | undefined,
  name?: string,
  email?: string
) => {
  try {
    const idToken = await user?.getIdToken();
    let response; 
    if(name) {
      response = await fetch(
        `${endpoint}/users/search?idToken=${idToken}&name=${name}`,
      );
    }
    else {
      response = await fetch(
        `${endpoint}/users/search?idToken=${idToken}&email=${email}`,
      );
    }
    const result = await handleFetchNotOk(response);
    return result;
  } catch (err) {
    return undefined;
  }
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

const addListingToRate = async (
  user: firebase.User | null | undefined,
  buyerId: string,
  listingId: string,
  creationTime: string,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/add-listing-to-rate?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        buyerId,
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

const deleteListingToRate = async (
  user: firebase.User | null | undefined,
  listingId: string,
  creationTime: number,
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/remove-listing-to-rate?idToken=${idToken}`, {
      method: 'DELETE',
      body: JSON.stringify({
        listingId,
        creationTime,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log("DEELLTEEEEEE");
    console.log(result);
    return true;
  } catch (err) {
    return false;
  }
};

const addUserRating = async (
  user: firebase.User | null | undefined,
  toRateUserId: string,
  rating: number
) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/rate-user?idToken=${idToken}`, {
      method: 'POST',
      body: JSON.stringify({
        toRateUserId,
        rating
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await handleFetchNotOk(response);
    console.log("DEELLTEEEEEE");
    console.log(result);
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
  deleteListing,
  getListings,
  getListingsBySearch,
  getListingsByTags,
  fetchIdListings,
  markAsSold,
  fetchListings,
  uploadPicture,
  uploadPictures,
  deletePicture,
  deletePictures,
  searchUser,
  addListingToRate,
  addUserRating,
  deleteListingToRate
};
