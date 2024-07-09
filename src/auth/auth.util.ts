import { Response } from 'express';

// setLoginCookie 함수는 로그인 요청에 대한 응답으로 쿠키를 설정합니다.
export const setLoginCookie = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  // 쿠키를 설정합니다.
  console.log('setLoginCookie environment: ', process.env.ENV);
  const sameSite = process.env.ENV === 'production' ? 'none' : 'strict';
  const secure = process.env.ENV === 'production' ? true : false;
  res.cookie('refreshToken', refreshToken, {
    domain: process.env.FRONTEND_DOMAIN,
    path: '/',
    sameSite,
    secure,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.cookie('accessToken', accessToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    domain: process.env.FRONTEND_DOMAIN,
    path: '/',
    sameSite,
    secure,
    httpOnly: false,
  });
};

export const setLogoutCookie = (res: Response) => {
    console.log('setLogoutCookie environment: ', process.env.ENV);
    const sameSite = process.env.ENV === 'production' ? 'none' : 'strict';
    const secure = process.env.ENV === 'production' ? true : false;
    res.clearCookie('refreshToken', {
        domain: process.env.FRONTEND_DOMAIN,
        path: '/',
        sameSite,
        secure,
        httpOnly: true,
    });
    res.clearCookie('accessToken', {
        domain: process.env.FRONTEND_DOMAIN,
        path: '/',
        sameSite,
        secure,
        httpOnly: false,
    });
    res.sendStatus(200);
}
