using System;
using System.Collections.Generic;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;

namespace WP6Service2.Services.Cerif
{
    [Route("/projects", "GET")]
    [Route("/projects/{Name}", "GET")]    
    public class GetProjects : IReturn<List<Project>>
    {
        public string Name { get; set; }
        public bool identifiersOnly { get; set; }// = true;
        //CERIF pagingSpec
        public int offset { get; set; }// = 0;
        public int pageSize { get; set; }// = 20;
        //CERIF returnedEntitySpec
        public bool fedIds { get; set; }// = true;
        public bool classifications { get; set; }// = true;
        public string links { get; set; }
        public string linkedObjects { get; set; }
        public bool linkedSemantics { get; set; }// = false;
    }

    public class Project
    {
        public int cfProjId { get; set; }
        public DateTime cfStartDate { get; set; }
        public DateTime cfEndDate { get; set; }
        public List<string> cfAcro { get; set; }
        public string cfTitle { get; set; }
        public string cfAbstract { get; set; }
        public List<string> cfKeyw { get; set; }
        public string cfProj_Class { get; set; }
        public List<string> cfFedId_Class { get; set; }
        public List<string> cfFedId { get; set; }
        public List<string> cfProj_ResPubl { get; set; }
        public List<string> cfProj_ResProd { get; set; }
        public List<string> Proj_Pers { get; set; }
        public List<string> cfProj_OrgUnit { get; set; }
        public List<string> Proj_Fund { get; set; }        
    }
    
    public class ProjectService :Service
    {
        public List<Project> Get(GetProjects request)
        {
            try{
                var range=GetProjectsImpl(request);
                if (range.Count > (request.pageSize))
                    return range.GetRange(request.offset, request.pageSize);
                else
                    return range;
            
             }
            catch (Exception e)
            {
                Console.WriteLine("ProjectService exception:{0}\n{1}",e.Message,e.StackTrace);
                throw e;
            }
        }

        private static List<Project> GetProjectsImpl(GetProjects request)
        {

                var l = new List<Project>();
                if (string.IsNullOrEmpty(request.Name) || request.Name == "West-Life")
                {
                    var p = new Project()
                    {
                        cfAbstract =
                            "West-Life provides services for computation and data management to researchers in structural biology, integrating multiple approaches and experimental techniques. It builds on European e-Infrastructure solutions from EGI and EUDAT and links together web services and repositories for structural biology. It is also engaged in the development and dissemination of best practices.",
                        cfAcro = new List<string>(){"West-Life", "West-Life Virtual Folder", "WL", "WL VF"},
                        cfStartDate = new DateTime(2015, 11, 1),
                        cfEndDate = new DateTime(2018, 11, 1),
                        cfKeyw = new List<string>(){"integrative structural biology", "data management"},
                        cfProj_Class = "OA mandated",
                        cfProj_OrgUnit =new List<string>()
                        {
                            "STFC",
                            "NKI AVL",
                            "EMBL",
                            "MU",
                            "CSIC",
                            "CIRMMP",
                            "Instruct",
                            "UU",
                            "Luna",
                            "INFN"
                        },
                        cfProj_ResProd = new List<string>(){"https://www.west-life.eu"},
                        cfTitle = "West-Life: Virtual Research Environment for Structural Biology",
                        cfProj_ResPubl = new List<string>(){"https://h2020-westlife-eu.gitbooks.io/virtual-folder-docs/index.html"},
                        cfProjId = 1,
                        Proj_Pers = new List<string>(){"Martyn Winn", "Chris Morris"}
                    };
                    if (request.fedIds)
                    {
                        p.cfFedId = new List<string>() {"https://www.west-life.eu", "https://portal.west-life.eu"};
                        if (request.classifications) p.cfFedId_Class = new List<string>() {"Website", "Website"};
                    }
                    l.Add(p);
                }
                return l;
  
        }
    }
}