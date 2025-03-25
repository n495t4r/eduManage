<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserRoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Guest routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

//Admin & super-admin routes
Route::middleware(['auth', 'verified', 'can:viewAny,user'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/page', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    })->name('dashboard');
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class);
    Route::post('users/bulk-action', [\App\Http\Controllers\Admin\UserController::class, 'bulkAction'])->name('users.bulk-action');
    Route::patch('users/{user}/toggle-active', [\App\Http\Controllers\Admin\UserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::put('users/{user}/roles', [UserRoleController::class, 'update'])->name('users.update-roles');
    Route::put('users/{user}/permissions', [UserRoleController::class, 'updatePermissions'])->name('users.update-permissions');
    Route::resource('roles', controller: RoleController::class);

});

//Teacher routes
Route::middleware(['auth', 'verified', 'roles:teacher'])->group(function () {
    Route::get('/teacher_dashboard', fn() => Inertia::render('teacher-dashboard/profile/leave-request/page'))->name('teacher_dashboard');
});

//Parent routes
Route::middleware(['auth', 'verified', 'roles:parent'])->group(function () {
    Route::get('/parent_dashboard', fn() => Inertia::render('parent-dashboard/page'))->name('parent_dashboard');
});

//General user routes
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/assignment', fn() => Inertia::render('admin/assignment/page'))->name('assignment');
    Route::get('/calender', fn() => Inertia::render('admin/calender/page'))->name('calender');
    Route::get('/courses', fn() => Inertia::render('admin/courses/page'))->name('courses');

    Route::get('/assign_courses', fn() => Inertia::render('dashboard/course-assignment/page'))->name('assign_courses');
    Route::get('/materials', fn() => Inertia::render('dashboard/materials/page'))->name('materials');
    Route::get('/payments', fn() => Inertia::render('dashboard/payments/page'))->name('payments');
    Route::get('/classes', fn() => Inertia::render('dashboard/virtual-classes/page'))->name('classes');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
