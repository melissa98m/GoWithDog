<?php
use App\Models\Tag;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class TagTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_create_a_new_tag()
    {
        $data = [
            'tag_name' => 'test',
            'color' => '#fff',
        ];

        $tag = Tag::create($data);

        $this->assertInstanceOf(Tag::class, $tag);
        $this->assertEquals($data['tag_name'], $tag->tag_name);
        $this->assertEquals($data['color'], $tag->color);
    }

    public function test_tags_listed_successfully()
    {

        $this->json('GET', 'api/tags', ['Accept' => 'application/json'])
            ->assertStatus(200);

    }

}
