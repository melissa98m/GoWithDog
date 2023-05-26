<?php
use PHPUnit\Framework\TestCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Ballade;

class BalladeTest extends TestCase{
public function testStore()
{
// Création d'un mock pour la classe Request
$request = $this->getMockBuilder(Request::class)
->disableOriginalConstructor()
->getMock();

// Définir les propriétés nécessaires pour le test
$request->expects($this->once())
->method('validate')
->with([
'ballade_name' => 'required|max:200',
'ballade_description' => 'required',
'distance' => 'required',
'denivele' => 'required',
'ballade_image' => 'nullable|mimes:png,jpg,jpeg|max:2048',
'ballade_latitude' => 'required',
'ballade_longitude' => 'required',
]);

$request->expects($this->once())
->method('hasFile')
->with('ballade_image')
->willReturn(true);

$request->expects($this->once())
->method('ballade_name')
->willReturn('Test Ballade');

$request->expects($this->once())
->method('ballade_description')
->willReturn('Test Ballade Description');

$request->expects($this->once())
->method('distance')
->willReturn(10);

$request->expects($this->once())
->method('denivele')
->willReturn(100);

$request->expects($this->once())
->method('ballade_image')
->willReturn('test_image.jpg');

$request->expects($this->once())
->method('ballade_latitude')
->willReturn(12.345);

$request->expects($this->once())
->method('ballade_longitude')
->willReturn(67.890);

$request->expects($this->once())
->method('tag')
->willReturn(1);

// Mock pour la classe Auth
$auth = $this->getMockBuilder(Auth::class)
->getMock();

$auth->expects($this->once())
->method('id')
->willReturn(1);

// Mock pour la classe Ballade
$ballade = $this->getMockBuilder(Ballade::class)
->getMock();

$ballade->expects($this->once())
->method('create')
->with([
'ballade_name' => 'Test Ballade',
'ballade_description' => 'Test Ballade Description',
'distance' => 10,
'denivele' => 100,
'ballade_image' => 'test_image.jpg',
'ballade_latitude' => 12.345,
'ballade_longitude' => 67.890,
'user' => 1,
'tag' => 1,
])
->willReturn($ballade);

$ballade->expects($this->once())
->method('tag')
->willReturnSelf();

$ballade->expects($this->once())
->method('get')
->willReturn([$ballade]);

$ballade->expects($this->once())
->method('user')
->willReturnSelf();

$ballade->expects($this->once())
->method('get')
->willReturn([$ballade]);

// Appel de la méthode store avec les mocks
$controller = new BalladeController();
$response = $controller->store($request, $auth, $ballade);

// Assertions
$this->assertEquals('Success', $response['status']);
$this->assertEquals($ballade, $response['data']);
}
}
