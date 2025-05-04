import React from 'react'
import { redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export async function action({ params }) {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Document deleted successfully');
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect('/dashboard/all-docs');
}

const DeleteJob = () => {
  return (
    <div>DeleteJob</div>
  )
}

export default DeleteJob