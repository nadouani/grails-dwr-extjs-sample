
<%@ page import="fr.nadouani.tutorial.Hotel" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'hotel.label', default: 'Hotel')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <div class="list">
                <table>
                    <thead>
                        <tr>
                        
                            <g:sortableColumn property="id" title="${message(code: 'hotel.id.label', default: 'Id')}" />
                        
                            <g:sortableColumn property="name" title="${message(code: 'hotel.name.label', default: 'Name')}" />
                        
                            <g:sortableColumn property="website" title="${message(code: 'hotel.website.label', default: 'Website')}" />
                        
                            <g:sortableColumn property="phoneNumber" title="${message(code: 'hotel.phoneNumber.label', default: 'Phone Number')}" />
                        
                            <g:sortableColumn property="city" title="${message(code: 'hotel.city.label', default: 'City')}" />
                        
                            <g:sortableColumn property="country" title="${message(code: 'hotel.country.label', default: 'Country')}" />
                        
                        </tr>
                    </thead>
                    <tbody>
                    <g:each in="${hotelInstanceList}" status="i" var="hotelInstance">
                        <tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
                        
                            <td><g:link action="show" id="${hotelInstance.id}">${fieldValue(bean: hotelInstance, field: "id")}</g:link></td>
                        
                            <td>${fieldValue(bean: hotelInstance, field: "name")}</td>
                        
                            <td>${fieldValue(bean: hotelInstance, field: "website")}</td>
                        
                            <td>${fieldValue(bean: hotelInstance, field: "phoneNumber")}</td>
                        
                            <td>${fieldValue(bean: hotelInstance, field: "city")}</td>
                        
                            <td>${fieldValue(bean: hotelInstance, field: "country")}</td>
                        
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
            <div class="paginateButtons">
                <g:paginate total="${hotelInstanceTotal}" />
            </div>
        </div>
    </body>
</html>
