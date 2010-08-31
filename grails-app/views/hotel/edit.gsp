

<%@ page import="fr.nadouani.tutorial.Hotel" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'hotel.label', default: 'Hotel')}" />
        <title><g:message code="default.edit.label" args="[entityName]" /></title>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="list" action="list"><g:message code="default.list.label" args="[entityName]" /></g:link></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.edit.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <g:hasErrors bean="${hotelInstance}">
            <div class="errors">
                <g:renderErrors bean="${hotelInstance}" as="list" />
            </div>
            </g:hasErrors>
            <g:form method="post" >
                <g:hiddenField name="id" value="${hotelInstance?.id}" />
                <g:hiddenField name="version" value="${hotelInstance?.version}" />
                <div class="dialog">
                    <table>
                        <tbody>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="name"><g:message code="hotel.name.label" default="Name" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'name', 'errors')}">
                                    <g:textField name="name" value="${hotelInstance?.name}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="website"><g:message code="hotel.website.label" default="Website" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'website', 'errors')}">
                                    <g:textField name="website" value="${hotelInstance?.website}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="phoneNumber"><g:message code="hotel.phoneNumber.label" default="Phone Number" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'phoneNumber', 'errors')}">
                                    <g:textField name="phoneNumber" value="${hotelInstance?.phoneNumber}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="city"><g:message code="hotel.city.label" default="City" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'city', 'errors')}">
                                    <g:textField name="city" value="${hotelInstance?.city}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="country"><g:message code="hotel.country.label" default="Country" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'country', 'errors')}">
                                    <g:textField name="country" value="${hotelInstance?.country}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="stars"><g:message code="hotel.stars.label" default="Stars" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'stars', 'errors')}">
                                    <g:textField name="stars" value="${fieldValue(bean: hotelInstance, field: 'stars')}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="rooms"><g:message code="hotel.rooms.label" default="Rooms" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'rooms', 'errors')}">
                                    <g:textField name="rooms" value="${fieldValue(bean: hotelInstance, field: 'rooms')}" />
                                </td>
                            </tr>
                        
                            <tr class="prop">
                                <td valign="top" class="name">
                                  <label for="beds"><g:message code="hotel.beds.label" default="Beds" /></label>
                                </td>
                                <td valign="top" class="value ${hasErrors(bean: hotelInstance, field: 'beds', 'errors')}">
                                    <g:textField name="beds" value="${fieldValue(bean: hotelInstance, field: 'beds')}" />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <span class="button"><g:actionSubmit class="save" action="update" value="${message(code: 'default.button.update.label', default: 'Update')}" /></span>
                    <span class="button"><g:actionSubmit class="delete" action="delete" value="${message(code: 'default.button.delete.label', default: 'Delete')}" onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');" /></span>
                </div>
            </g:form>
        </div>
    </body>
</html>
