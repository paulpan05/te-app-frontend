import endpoint from '../configs/endpoint';

const handleFetchNotOk = async (res: Response) => {
  const jsonResult = await res.json();
  if (!res.ok) {
    console.log(jsonResult);
    throw Error(jsonResult);
  }
  return jsonResult;
};

const getUserProfile = async (user: firebase.User | null | undefined, setter:Function) => {
  try {
    const idToken = await user?.getIdToken();
    const response = await fetch(`${endpoint}/users/profile?idToken=${idToken}`);
    const result = await handleFetchNotOk(response);
    setter(result);
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

  const getListingsBySearch = async (user: firebase.User | null | undefined, searchTerm: string, setter: Function) => {
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`${endpoint}/listings/search?idToken=${idToken}&searchTerm=${searchTerm}`);
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

const updateProfile = async (user: firebase.User | null | undefined, phone: string, picture: string, name: string) => {
    /* TODO need to upload pictures to s3! */
    try {
      const idToken = await user?.getIdToken();
      const response = await fetch(`${endpoint}/users/update?idToken=${idToken}`, {
        method: 'PUT',
        body: JSON.stringify({
          phone,
          picture,
          name,
        })
      });
      const result = await handleFetchNotOk(response);
      console.log(result);
      return true;
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }

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

  const markAsSold = async (
    user: firebase.User | null | undefined,
    listingId: string,
    listingCreationTime: string,
    sellerId: string,
    buyerId:string
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

export { handleFetchNotOk, getUserProfile, userSignup, updateProfile, getListings, getListingsBySearch, getListingsByTags, createListing, fetchIdListings, saveListing, unsaveListing};