<?php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    /** @test */
    public function it_can_create_a_user()
    {
        $data = [
            'username' => 'john_doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
            'roles' => json_encode(["ROLE_USER"]),
        ];

        $user = User::create($data);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals($data['username'], $user->username);
        $this->assertEquals($data['email'], $user->email);
        $this->assertEquals($data['password'], $user->password);
        $this->assertEquals($data['roles'], $user->roles);
    }
}
