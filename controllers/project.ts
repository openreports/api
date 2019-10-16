import Project, { IProject } from '../models/Projects';
import User from '../models/User';

async function create(req, res) {
  const {
    name,
    url,
    type,
    isPublic
  } = req.body

  const slug = req.body.slug.toLowerCase()

  if (!name || !url || !type || !slug || !isPublic) {
    res
      .status(400)
      .json({
        errorMessage: 'One or more of the fields are missing'
      })
    return;
  }

  const project = await Project.bySlug(slug)

  if (project !== null) {
    res
      .status(400)
      .json({
        errorMessage: 'Project with the slug already exists'
      })
    return;
  }

  try {
    const user = await User.findOne({ email: req.user.email })

    if (user.project) {
      res
        .status(400)
        .json({
          errorMessage: 'You already have a project and hence cannot create another'
        })
      return;
    } else {
      const newProject:IProject = new Project({
        name,
        url,
        type,
        slug,
        isPublic
      })
  
      await newProject.save() 

      user.project = slug

      await user.save()

      res
        .status(201)
        .json({
          name: name,
          slug: slug
        })
    }
  } catch (err) {
    res
      .status(400)
      .json({
        errorMessage: err.message,
        error: err
      })
  }
}

export default {
  create
}