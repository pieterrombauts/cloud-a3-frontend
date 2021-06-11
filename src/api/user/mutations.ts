import { withAuth } from 'api/auth/tokens';
import { API_GATEWAY_URL } from 'api/contants';
import axios from 'axios';

interface GetUploadLinkResponse {
  key: string;
  signedUrl: string;
}

export async function uploadAvatar(file: File) {
  const authAxios = withAuth(axios);
  const {
    data: { key, signedUrl },
  } = await authAxios.post<GetUploadLinkResponse>(
    API_GATEWAY_URL + '/getUploadLink',
    {
      fileName: file.name,
      fileType: file.type,
    },
  );

  var options = {
    headers: {
      'Content-Type': file.type,
    },
  };

  console.log(axios.interceptors);
  await axios.put(signedUrl, file, options);

  await authAxios.post(API_GATEWAY_URL + '/updateUser', {
    avatar: key,
  });
}
