import { redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { verifyToken } from '../utils/jwt';

export const requireAuth: LoaderFunction = async ({ request }) => {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return redirect('/login');
  }

  try {
    const { userId } = verifyToken(token);
    return { userId };
  } catch (error) {
    return redirect('/login');
  }
}; 