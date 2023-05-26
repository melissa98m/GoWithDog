<?php

use App\Models\Address;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AddressTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */

    public function test_addresses_listed_successfully()
    {
        $this->json('GET', 'api/addresses', ['Accept' => 'application/json'])
            ->assertStatus(200);

    }

    public function it_can_create_a_new_address()
    {
        $data = [
            'address' => '6 rue test',
            'postal_code' => '38400',
            'city' => 'Test',
            'latitude' => 45.50,
            'longitude' => 55.60,
        ];

        $address = Address::create($data);

        $this->assertInstanceOf(Address::class, $address);
        $this->assertEquals($data['address'], $address->address);
        $this->assertEquals($data['postal_code'], $address->postal_code);
        $this->assertEquals($data['city'], $address->city);
        $this->assertEquals($data['latitude'], $address->latitude);
        $this->assertEquals($data['longitude'], $address->longitude);


    }
}
