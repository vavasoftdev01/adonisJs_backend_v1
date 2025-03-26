import TUser from '#models/t_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SamplesController {
  /**
   * Display a list of resource
   */
  async index({ response, request }: HttpContext) {
    request.url()

    const users = await TUser.query().orderBy('id', 'desc').paginate(request.input('page') || 1, request.input('perPage')  || 10)
    
    return response.status(200).json({
      data: users
    })

    
  }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request }: HttpContext) {
    try {
      const user = await TUser.create({
        name: request.input('name'),
        job_title: request.input('jobTitle'),
        job_desc: request.input('jobDesc'),
        zodiac_sign: request.input('zodiacSign'),
        gender: request.input('gender'),
      })
  
      return response.status(201).json({ new_TUser: user})
  
    } catch (error) {
      return response.status(422).json({ error: error})
    }
  }

  /**
   * Show individual record
   */
  async show({ response, params }: HttpContext) {
    const user = await TUser.find(params.id)

    return response.status(200).json({
      data: user
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const updateUser = await TUser.updateOrCreate(
        { id: params.id },
        {
          name: request.input('name'),
          job_title: request.input('jobTitle'),
          job_desc: request.input('jobDesc'),
          zodiac_sign: request.input('zodiacSign'),
          gender: request.input('gender'),
        })
  
      return response.json({ data: updateUser})
    } catch (error) {
      return response.status(422).json({ error: error})
    }
    
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}