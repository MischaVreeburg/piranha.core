/*
 * Copyright (c) 2019 Håkan Edling
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 * https://github.com/piranhacms/piranha.core
 *
 */

using System;
using System.Collections.Generic;
using Piranha.Extend;

namespace Piranha.Manager.Models
{
    /// <summary>
    /// Content edit model.
    /// </summary>
    public abstract class ContentEditModel
    {
        public class BlockItem
        {
            public string Name { get; set; }
            public string Icon { get; set; }
            public string Component { get; set; }
            public Block Item { get; set; }
        }

        public Guid Id { get; set; }
        public string TypeId { get; set; }
        public string Title { get; set; }
        public IList<BlockItem> Blocks { get; set; } = new List<BlockItem>();
    }
}