using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace rest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TxtController : ControllerBase
    {

        [HttpGet("{id}")]
        public ActionResult<Dictionary<string, string>> Get(int id)
        {
            var txt = new rest.Services.Txt(id);
            var s = txt.GetParsed();
            s = rest.Services.Txt.ReplaceLinks(s, "/page/$0");
            var ret = new Dictionary<string, string>
            {
                ["content"] = s
            };
            return ret;         
        }

    }
}
