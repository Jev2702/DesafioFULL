﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DesafioFULL.Models
{
    public class Notification
    {
        public string Key { get; }
        public string Message { get; }

        public Notification(string key, string message)
        {
            Key = key;
            Message = message;
        }
    }
}