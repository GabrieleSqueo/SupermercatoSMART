import type { ActionFunction } from '@remix-run/node';
import { User } from '../models/User';
import { connectDB } from '../utils/db';
import { generateToken } from '../utils/jwt';

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return { error: 'Method not allowed' ,  status: 405 };
  }

  try {
    await connectDB();
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Email and password are required' ,  status: 400 };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Invalid credentials' ,  status: 401 };
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return { error: 'Invalid credentials' ,  status: 401 };
    }

    //Generazione del token JWT per l'autenticazione
    const token = generateToken(user._id.toString());
    
    return { 
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return { error: 'Internal server error' , status: 500 };
  }
}; 