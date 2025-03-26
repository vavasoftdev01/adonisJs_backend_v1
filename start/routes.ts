/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import SamplesController from '#controllers/samples_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'It works!')

router.resource('ado-crud', SamplesController)