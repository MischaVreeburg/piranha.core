﻿/*
 * Copyright (c) 2016 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 * 
 * https://github.com/piranhacms/piranha.core
 * 
 */

using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Piranha.Areas.Manager.Controllers
{
    public class BlockController : ManagerAreaControllerBase
    {
        /// <summary>
        /// Default constroller.
        /// </summary>
        /// <param name="api">The current api</param>
        public BlockController(IApi api) : base(api)
        {
        }

        /// <summary>
        /// Gets the list view for the blocks.
        /// </summary>
        [Route("manager/blocks")]
        public IActionResult List()
        {
            return View();
        }
    }
}
