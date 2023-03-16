<?php
use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CategoryFTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_create_a_new_category()
    {
        $response = $this->post('/categories', ['category_name' => 'New Category']);

        $response->assertRedirect('/categories');
        $this->assertDatabaseHas('categories', ['category_name' => 'New Category']);
    }
}
