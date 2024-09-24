'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';
import { User } from '@/frontend/model/user';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface RouteParams extends Params {
  userId: string
};

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();

  const router = useRouter();

  const params = useParams<RouteParams>();

  console.log(`User ID: ${params.userId}`);

  useEffect(() => {
    async function fetchUser(userId: string) {
      const user = await userClient.fetch(Number(userId));

      if (!user) return;

      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAge(user.age);
      setWeight(user.weight);
    }

    fetchUser(params.userId);
  }, [params.userId]);

  const handleUpdateUser = async () => {
    async function createUser(user: User) {
      const newUser = await userClient.create(user);

      if (!newUser) return;

      router.push(`/users/${params.userId}`);
    }

    const user: User = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      weight: weight
    };

    createUser(user);
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="first-name">
        <Form.Label>First Name</Form.Label>

        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="last-name" className="mt-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="age" className="mt-3">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="text"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group controlId="weight" className="mt-3">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="text"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={handleUpdateUser}>
        Submit
      </Button>
    </Form>
  );
};
