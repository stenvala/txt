using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.RegularExpressions;
using HtmlAgilityPack;

namespace rest.Services
{
    public class Txt
    {

        private const string URL = "http://www.yle.fi/tekstitv/txt/";
        private bool found;
        public string originalContent;

        public Txt(int page)
        {
            originalContent = "";
            ReadUrlAsync(page);
        }

        private async void ReadUrlAsync(int page)
        {
            originalContent = "";
            var client = new HttpClient();
            for (var i = 1; i < 8; i++) // This is how many sub pages we try to read
            {
                var response = client.GetAsync(URL + page.ToString() + "_000" + i.ToString() + ".htm").Result;                
                found = response.IsSuccessStatusCode;
                if (found)
                {
                    var content = await response.Content.ReadAsStringAsync();                    
                    originalContent = originalContent + FindOnlyBody(content);
                }
                else
                {
                    if (originalContent != "")
                    {
                        found = true;
                    }
                    break;
                }
            }
        }

        public string GetParsed()
        {
            if (!found)
            {
                return "";
            }
            var s = originalContent;            
            //s = FindOnlyBody(originalContent);
            s = StripHtmlTags(s);
            s = ReplaceOUML(s);
            // s = LineBreaksToHtml(s);
            if (!found)
            {
                return "Failed somewhere";
            }
            return s;
        }

        private string FindOnlyBody(string s)
        {
            string pattern = @"<pre>(.*)</pre>";
            // pattern = @"^(.*)$";
            Match result = Regex.Match(s, pattern, RegexOptions.Singleline);
            if (!result.Success)
            {
                found = false;
                return "";
            }
            return result.Value.Replace("<pre>","").Replace("</pre>","");
        }

        private string StripHtmlTags(string s)
        {
            var h = new HtmlDocument();
            h.LoadHtml(s);
            return h.DocumentNode.InnerText;         
        }

        private string ReplaceOUML(string s)
        {
            var map = new Dictionary<string, string>
            {
                ["&ouml;"] = "ö",
                ["&Ouml;"] = "Ö",
                ["&auml;"] = "ä",
                ["&Auml;"] = "Ä",
                ["&uuml;"] = "ü",
                ["&Uuml;"] = "Ü",
                ["&quot;"] = "\"",
                ["&nbsp;"] = " "
            };
            foreach (var i in map)
            {
                s = s.Replace(i.Key, i.Value);
            }
            return s;
        }

        private string LineBreaksToHtml(string s)
        {
            return s.Replace("\n", "<br>");
        }

        // Technically this is client side issue, I do it here to test regular expression replace
        public static string ReplaceLinks(string s, string uri)
        {string pattern = @"[1-9][0-9]{2}";
            s = Regex.Replace(s, pattern, "<span class=\"link\">$0</span>");
            return s;
        }
    }
}
