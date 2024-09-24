'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button } from 'react-bootstrap';
import { User } from '@/backend/model/user';
import { UserClient } from '@/frontend/client/user/user-client';
import BackendUserClient from '@/frontend/client/user/backend-user-client';

const userClient: UserClient = new BackendUserClient();

export default function Page() {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();

  const router = useRouter();

  const handleCreateUser = async () => {
    async function createUser(user: User) {
      const newUser = await userClient.create(user);

      if (!newUser) return;

      router.push('/users');
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

      <Button className="mt-3" variant="primary" type="button" onClick={handleCreateUser}>
        Submit
      </Button>
    </Form>
  );
};
