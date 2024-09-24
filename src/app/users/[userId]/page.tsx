'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/component/spacer';
import { User } from '@/frontend/model/user';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface RouteParams extends Params {
  userId: string
};

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [user, setUser] = useState<User>({});

  const router = useRouter();

  const params = useParams<RouteParams>();

  console.log(`User ID: ${params.userId}`);

  useEffect(() => {
    async function fetchUser(userId: string) {
      const user = await userClient.fetch(Number(userId));

      if (!user) return;

      setUser(user);
    }

    fetchUser(params.userId);
  }, [params.userId]);

  const handleDeleteUser = async (userId: string) => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (!confirmation) return;

    const deleteSuccessful = await userClient.destroy(Number(userId));

    if (!deleteSuccessful) return;

    router.push('/users');
  };

  if (user == null) return;

  return (
    <>
      <h1>User</h1>

      <Link className="me-auto" href="/users">Back</Link>

      <Spacer />

      <div>
        <Link href={`/users/${params.userId}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={async () => await handleDeleteUser(params.userId)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{user.age}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{user.weight}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
